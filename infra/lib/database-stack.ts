//import { Construct } from 'constructs';
//import { App, Stack, StackProps } from 'aws-cdk-lib';
//import { aws_rds as rds, aws_ec2 as ec2, aws_secretsmanager as secretsmanager } from 'aws-cdk-lib';

//interface DatabaseProps extends StackProps {
//  vpc: ec2.IVpc;
//  dbSecret: secretsmanager.ISecret;
//  securityGroupBastion: ec2.ISecurityGroup;
//  securityGroupFargate: ec2.ISecurityGroup;
//}

//export class DatabaseStack extends Stack {
//  constructor(scope: Construct, id: string, props: DatabaseProps) {
//    super(scope, id, props);

//    const { vpc, dbSecret, securityGroupBastion, securityGroupFargate } = props;

//    const dbName = process.env.DB_NAME || 'postgresDB';
//    const dbUsername = process.env.DB_USERNAME || 'postgresUser';
//    const dbPassword = dbSecret.secretValue;

//    const dbInstance = new rds.DatabaseInstance(this, 'Instance', {
//      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_12 }),
//      vpc,
//      vpcSubnets: {
//        subnetType: ec2.SubnetType.PRIVATE_ISOLATED
//      },
//      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
//      credentials: rds.Credentials.fromPassword(dbUsername, dbPassword),
//      databaseName: dbName,
//      port: 5432
//    });

//    //dbInstance.dbInstanceEndpointAddress;

//    //allow connections to db from fargate and bastion host
//    dbInstance.connections.allowFrom(securityGroupFargate, ec2.Port.tcp(5432));
//    dbInstance.connections.allowFrom(securityGroupBastion, ec2.Port.tcp(5432));
//  }
//}
