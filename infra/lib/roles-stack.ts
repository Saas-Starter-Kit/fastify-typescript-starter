import { Construct } from 'constructs';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { aws_iam as iam } from 'aws-cdk-lib';

export class RolesStack extends Stack {
  public readonly FargateRole: iam.IRole;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fargateRole = new iam.Role(this, 'FargateRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy')
      ]
    });

    this.FargateRole = fargateRole;
  }
}
