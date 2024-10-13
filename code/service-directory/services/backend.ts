import {ComponentResource, CustomResourceOptions} from "@pulumi/pulumi";
import {FmBucket} from "../resources/bucket";
import {FmDockerImageRepo} from "../resources/ecr-repository";

type FmBackendArgs = {
    name: string
    product: string
}

export class FmBackend extends ComponentResource {
    constructor(args: FmBackendArgs, opts?: CustomResourceOptions) {
        const componentName = `${args.product}-${args.name}`

        super('pkg:index:FmBackend', componentName, {}, opts)

        const source = new FmBucket({
            name: args.name,
            product: args.product,
            public: true
        }, {
            parent: this
        })

        new FmDockerImageRepo({
            name: args.name,
            product: args.product
        }, {
            parent: this
        })
    }
}