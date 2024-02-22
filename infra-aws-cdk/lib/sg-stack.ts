import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

interface SGProps extends StackProps {
  vpc: ec2.IVpc;
}

export class SGStack extends Stack {
  public readonly SecurityGroupFargate: ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props: SGProps) {
    super(scope, id, props);

    const { vpc } = props;

    /* 
        Security Groups
    */

    const securityGroupFargate = new ec2.SecurityGroup(this, `SG-Fargate`, {
      vpc
    });

    securityGroupFargate.addIngressRule(ec2.Peer.ipv4('0.0.0.0/0'), ec2.Port.tcp(80));

    this.SecurityGroupFargate = securityGroupFargate;

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
