## 6. Technical Design Documents
### The power of TDDs
#### Your first TDD
- what problem are we trying to solve? (you should always have this)
- what is the current process? (optional, though normally helpful)
- what are the requirements? (optional, can  help with scope)
- how do we solve this problem? (you should always have this)

It's not recommended to propose using a specific technology to solve the problem.

## 7. Writing a Technical Design Document

# Section 3. Managing Infrastructure with Pulumi
## 12. Infrastructure Standardization

TDD for standardized infrastructure

### standardized infrastructure
#### Problem
We have no defined patterns or choices around how we describe services in our infrastructure.

#### What are the services?
- frontends
- backends

#### What do they need?
##### frontends
- store the static files
- ingress of some type

##### backends
- container(s)
- ingress of some type

#### What do we need?
- We need simple interfaces that allow us to pull of the shelf deployments for a specific service type. So we wanna use
**code** to describe what these interfaces are gonna look like. Pull of the shelf deployments
means instead of making new solutions - in this case new type of deployments - every time, standardize the deployment, so that we have
ready to use solutions.
- We need a simple way of managing these resources and updating them when changed
- we need a way for **DEVELOPERS** not devops to create cloud resources
    - no more asking for buckets in slack. If this happens, you tell them: no I won't do this. Do it yourself. The main reason for
    that is because we have opinions around this specific thing.

Notice no mention of technology or tool here.

## 13. Service Directory
Q: What is service-directory?

A: We wanna standardize services, so that we can give ready-to-use solutions to frontends and backends and when we're talking
about a directory, we're talking about a location where we can configure everything in one space.

**Devs** can go into this directory and add what they want and then it will be deployed for them.

Terraform can also do the automation stuff that we wanna do with pulumi. But pulumi has all of this since it's a language. But with
terraform, you have to do a lot of auto generation because terraform is not a lang, it's a DSL. So we can't achieve some things with it.
We wanna lean on generic lang instead.

## 14. Pulumi Setup
Pulumi stacks are like environments. For example dev stack, prod stack and ... .

## 15. Storing Static Resources
`services` use `resources`. resources are general things that services(like frontend-service) use. For example a bucket
is a resource.

We can take some resources and logically group them into a component resource.

The pulumi classic resources are mirror of terraform's. The native providers are re-written into pulumi and are not feature-complete.
So it's recommended using classic providers until you know for sure that you can move to native.

## 16. Standardizing & Automating Buckets
## 17. Generating Buckets with Pulumi
## 18. Automating Buckets at Scale
## 19. Frontend Source Code Buckets

## 20. Enable Static Website Hosting

## 21. Managing Container Repositories
Don't name things using the cloud provider services. Like don't use sth like ecr in naming of things. So that you don't get locked in.

Components are isolated to their resource types. So just like terraform, we can have a bunch of
different resources with the exact same name and they can spread across components. So you don't have to give a unique name to
each resource. Because their component is different.

## 22. Pulumi Q&A