
# Our Developer Stories

Our standards for managing, planning, designing, testing, and programming in the development of Glascad software.

## Planning

> Developers should be confident that they are working on the most important task at any given moment, and that other important tasks will be taken care of in their due time.

### Trusting in the future

Trusting in the future is derived from both:

- our planning for future features/stories/requirements
- our commitment to leave future items in the future and commit to the present task

## Standards

### Testing - Separation of Concerns, Organization, Completeness

Each test should be complete in testing the single concern it is meant to address, and in accounting for all possibilities, including possible inputs, outputs, errors, and edge cases.

Each test should also be flexible against potential changes in design (either ux, front-end, or database design)

### Refactor & Test As We Go & As Things Break

As we update our standards and practices for code organisation and testing, we do not update or refactor things that are not broken.

We refactor old code to current standards as we revisit it to implement new features, and we update and refactor tests of old features as those old features break.

<!-- ### React

... -->

<!-- ### SCSS

... -->

<!-- ### SQL

... -->

## Process & Continuous Integration

> Glascad has a standardized process of maintaining a working version of the software in the cloud.<br>
> Developers are free from fear of breaking existing things when they create new things.

### Design & Application Review

Review Process:

- Confirm the following:
    - Application matches design (appearance)
    - New features function as expected
    - Old features are not broken
- Track all concerns
- Set timeline for addressing each concern (pass timeline on to code review)

We regulary discuss discrepancies between the design and implementation of the application, addressing whatever design issues have come up during the development process. We use this time also to manually test the functionality of each new feature and of old features, and log necessary changes.

This meeting can also serve the purpose of intentionally procrastinating unimportant design/appearance issues that may be addressed later, as well as simplifying the functionality down to core behavior.

### Code Review

Review process:

- Confirm the following:
    - All tests are passing
    - Tests satisfy above standards
    - Code satisfies standards
- Track all concerns
- Set timeline for addressing each concern (and review timeline from design/application review)

We need to have a process of merging our code into master that includes making sure that all requirements are met /stories are told and reviewing tests and code to make sure that standards listed above are met.

We ought to go through this process every Friday, committing our changes for the week and creating a merge request into the master branch, and then reviewing first the tests to make sure all requirements/edge cases are accounted for, and then the application code.

## Summary

We follow the principles of Test-Driven Development, Modularity, Separation of Concerns, and Single Source of Truth.

We have a design and application review at the end of each sprint on Thursday, followed by a code review on Friday.
