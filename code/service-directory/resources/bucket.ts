import {ComponentResource, CustomResourceOptions, getStack} from "@pulumi/pulumi";
import {Bucket, BucketArgs} from "@pulumi/aws/s3";
import {BucketPublicAccessBlock} from "@pulumi/aws/s3/bucketPublicAccessBlock";

// our domain specific language for creating buckets. So that devs never ever touch the bucket creation logic.
type FmBucketArgs = {
    name: string
    product: string

    // resources are private by default. We want sane defaults!
    public?: boolean
}

export class FmBucket extends ComponentResource {
    constructor(args: FmBucketArgs, opts?: CustomResourceOptions) {
        // note: `componentName` var is the standardized name

        /* note: component itself gets a standardized name, but the resources only use the `args.name` not the standardized name.
        Why? Because we can get conflicts if we use standardized name in multiple resources. */
        /* Note: we use args.name as the resource name in pulumi, but `name` for the resource(bucket) in aws. */
        const componentName = `${args.product}-${args.name}`
        const stack = getStack()
        const bucketName = `${componentName}-${stack}`

        super('pkg:index:FmBucket', componentName, {}, opts)

        let bucketArgs: BucketArgs = {
            acl: 'private',
            bucket: bucketName,
            tags: {
                Environment: stack
            }
        }

        if (args.public) {
            bucketArgs.acl = 'public-read'
            bucketArgs.website = {
                indexDocument: 'index.html',
                errorDocument: 'error.html',
                routingRules: `[
                    {
                        "Condition": {
                            "KeyPrefixEquals": "docs/"
                        },
                        "Redirect": {
                            "ReplaceKeyPrefixWith": "documents/"
                        }
                    }
                ]`
            }
        }

        // this is a resource, it only uses args.name not the standardized `name` var
        const bucket = new Bucket(args.name, bucketArgs, {
            // tells pulumi which component the resource lives in
            parent: this
        })

        if (args.public) {
            new BucketPublicAccessBlock(args.name, {
                bucket: bucket.id,
                blockPublicAcls: true,
                blockPublicPolicy: true,
                ignorePublicAcls: true,
                restrictPublicBuckets: true
            }, {
                parent: this
            })
        }
    }
}