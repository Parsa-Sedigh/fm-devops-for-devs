import {FmFrontend} from "./services/frontend";
import {FmBackend} from "./services/backend";

function main() {
    new FmFrontend({
        name: 'example',
        product: 'devops-course',
    })

    new FmBackend({
        name: 'example',
        product: 'devops-course',
    })
}

main()