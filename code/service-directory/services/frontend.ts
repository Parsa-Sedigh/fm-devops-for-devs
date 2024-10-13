import {ComponentResource, CustomResourceOptions} from "@pulumi/pulumi";
import {FmBucket} from "../resources/bucket";

type FmFrontendArgs = {
    name: string
    product: string
}

export class FmFrontend extends ComponentResource {
    constructor(args: FmFrontendArgs, opts?: CustomResourceOptions) {
        const componentName = `${args.product}-${args.name}`

        super('pkg:index:FmFrontend', componentName, {}, opts)

        // primary bucket
        const source = new FmBucket({
            name: args.name,
            product: args.product,
            public: true
        }, {
            parent: this
        })

        // we could create a private replica maybe
        // const replica = new FmBucket({
        //     name: `${args.name}-replica`,
        //     product: args.product
        // }, {
        //     parent: this
        // })
    }
}