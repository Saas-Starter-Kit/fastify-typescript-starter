import * as path from 'path';
import { Construct } from 'constructs';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { aws_ecs as ecs, aws_ecs_patterns as ecs_patterns, aws_ec2 as ec2 } from 'aws-cdk-lib';

import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';

interface ComputeProps extends StackProps {
  vpc: ec2.IVpc;
  //dbSecret: secretsmanager.ISecret;
  //role: iam.IRole;
  //securityGroupFargate: ec2.ISecurityGroup;
}

export class ComputeStack extends Stack {
  constructor(scope: Construct, id: string, props: ComputeProps) {
    super(scope, id, props);

    const { vpc } = props;

    /* 
        Fargate Service
    */

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
      enableFargateCapacityProviders: true
    });

    const dockerAsset = new DockerImageAsset(this, 'MyBuildImage', {
      directory: path.join(__dirname, '../../')
    });

    const AUTH_SECRET = process.env.AUTH_SECRET || 'testsec123';

    const DB_NAME = process.env.DB_NAME || 'postgres';
    const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
    const DB_PORT = process.env.DB_PORT || '5432';
    const DB_HOST = process.env.DB_HOST || 'db_host123';
    const DB_PASSWORD = process.env.DB_PASSWORD || 'testpass123';

    const loadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      'MyFargateService',
      {
        cluster: cluster,
        desiredCount: 1,
        taskImageOptions: {
          image: ecs.ContainerImage.fromDockerImageAsset(dockerAsset),
          containerPort: 80,
          //taskRole: role,
          //secrets: {
          //  DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret)
          //},
          environment: {
            AUTH_SECRET,
            DB_HOST,
            DB_PORT,
            DB_NAME,
            DB_USERNAME,
            DB_PASSWORD
          }
        },
        publicLoadBalancer: true
        //securityGroups: [securityGroupFargate]
      }
    );

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: '/ping'
    });
  }
}
