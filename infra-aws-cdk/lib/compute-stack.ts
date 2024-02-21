import * as path from 'path';
import { Construct } from 'constructs';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import {
  aws_ecs as ecs,
  aws_ecs_patterns as ecs_patterns,
  aws_iam as iam,
  aws_ec2 as ec2,
  aws_secretsmanager as secretsmanager
} from 'aws-cdk-lib';

import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';

interface ComputeProps extends StackProps {
  vpc: ec2.IVpc;
  //dbSecret: secretsmanager.ISecret;
  role: iam.IRole;
}

export class ComputeStack extends Stack {
  constructor(scope: Construct, id: string, props: ComputeProps) {
    super(scope, id, props);

    const { vpc, role } = props;

    /* 
        Fargate Service
    */

    //const securityGroupFargate = new ec2.SecurityGroup(this, `SG-Fargate`, {
    //  vpc
    //});

    //securityGroupFargate.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(80));

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
      enableFargateCapacityProviders: true
    });

    const dbName = process.env.DB_NAME || 'postgresDB';
    const dbUsername = process.env.DB_USERNAME || 'postgresUser';
    const dbPort = process.env.DB_PORT || '5432';
    const dbHost = process.env.DB_HOST || 'dbHost';

    const dockerAsset = new DockerImageAsset(this, 'MyBuildImage', {
      directory: path.join(__dirname, '..')
    });

    const loadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      'MyFargateService',
      {
        cluster: cluster,
        desiredCount: 1,
        taskImageOptions: {
          image: ecs.ContainerImage.fromDockerImageAsset(dockerAsset)
          containerPort: 80
          //taskRole: role
          //executionRole: role,
          //secrets: {
          //  DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret)
          //},
          //environment: {
          //  NODE_ENV: 'production',
          //  PORT: '4000',
          //  HOST: '0.0.0.0',
          //  ORIGIN: 'localhost',
          //  DATABASE_URL:
          //    'postgresql://iqbal125:O5kdPIKESMf4@ep-restless-bar-a5hnlwzz.us-east-2.aws.neon.tech/test_db?schema=public',
          //  AUTH_SECRET: '124d'
          //}
        },
        publicLoadBalancer: true
        //securityGroups: [securityGroupFargate]
      }
    );

    //loadBalancedFargateService.targetGroup.configureHealthCheck({
    //  path: '/ping'
    //});

    /* 
        Bastion Host
    */

    //let securityGroupBastion = new ec2.SecurityGroup(this, 'bastion-security', {
    //  vpc
    //});

    //securityGroupBastion.addEgressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(4000));

    //this.SecurityGroupBastion = securityGroupBastion;

    ////Bastion Host to access DB
    //new ec2.BastionHostLinux(this, 'BastionHost', {
    //  vpc,
    //  securityGroup: securityGroupBastion
    //});
  }
}
