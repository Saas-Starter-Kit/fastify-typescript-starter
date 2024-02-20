import { Construct } from 'constructs';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { aws_iam as iam, aws_secretsmanager as secretsmanager } from 'aws-cdk-lib';

interface SecretsProps extends StackProps {
  role: iam.IRole;
}

export class SecretsStack extends Stack {
  public readonly DbSecret: secretsmanager.ISecret;

  constructor(scope: Construct, id: string, props: SecretsProps) {
    super(scope, id, props);

    const { role } = props;

    const dbSecret = new secretsmanager.Secret(this, 'Secret', {
      generateSecretString: {
        excludeCharacters: '/@" \\\''
      }
    });

    this.DbSecret = dbSecret;
    dbSecret.grantRead(role);
  }
}
