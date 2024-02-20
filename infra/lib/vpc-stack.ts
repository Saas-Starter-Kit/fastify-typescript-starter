import { Construct } from 'constructs';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

export class VpcStack extends Stack {
  public readonly VPC: ec2.IVpc;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /* 
        VPC Setup
    */

    const vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 3,
      natGateways: 1 // delete Nat Gateway after deploy
    });

    this.VPC = vpc;
  }
}
