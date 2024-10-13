import {ComponentResource, CustomResourceOptions, getStack} from "@pulumi/pulumi";
import {ecr} from "@pulumi/aws";

type FmDockerImageRepoArgs = {
    name: string
    product: string
}

export class FmDockerImageRepo extends ComponentResource {
    constructor(args: FmDockerImageRepoArgs, opts?: CustomResourceOptions) {
        const componentName = `${args.product}-${args.name}`
        const stack = getStack()

        super('pkg:index:FmDockerImageRepo', componentName, {}, opts)

        /* We don't want to use the stack name on an ecr repo name and images. Why? Because docker has the ability to use tags.
        So we create one common repo without using stack name, but instead we'll use the stack name on the image names themselves.
        So the image name could be: `my-image:dev`.

        Using this kind of naming convention for docker repos, make it that we only have to push and pull from one repo instead of
        multiple repos which is annoying.*/
        const dockerImageRepoName = `${componentName}-${stack}`

        const dockerImageRepo = new ecr.Repository(args.name, {
            name: componentName,
            imageScanningConfiguration: {
                scanOnPush: false
            },
            imageTagMutability: 'MUTABLE'
        }, {
            parent: this
        })

    }
}