# ADR (Architecture Design Record) for e-commerce store

- Author : Kavitha
- Date: 2023-02-01

**Context and Problem Statement**

Clients can add items to their cart  and checkout  to successfully place an order. Every *n*th order gets a coupon code for 10% discount and can apply to their cart. ****

**Decision Drivers**

- Reliability
- Scalability
- Cost
- Technical expertise, knowledge and experience

**Decision Outcome**

Chosen option: **Option 1**, because we intend to build a scalable, lite weight application to demonstrate technical capabilities

**Pros and Cons of the Options**

### Option 1

[React, Typescript, Express and SQLite]

- Good, because  Component-Based Architecture, high performance, easy to configure and customize, light weight, serverless DB
- Good, because easy to learn
- Bad, because Higher Pace Of Development, more code needed to do the same thing. DB is not suitable for large scale apps

### Option 2

[Angular, Python, NodeJS and MongoDB]

- Good, because Start quickly, great community, full cloud-based developer data platform
- Good, because it is used for scientific and mathematical computing
- Bad, because Limited SEO Capabilities, High memory usage
