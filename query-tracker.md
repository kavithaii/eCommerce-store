# Date - 01/30/2023
## Questions
1. The second admin api is returning List of Discount codes,
  - Why do we need to return list of discount codes? [UB] The idea is that client can use this to validate if the one presented is valid.
  - Can the merchant use multiple discount codes on a single order (i.e., will applying 2 discount codes give 20% discount)? [UB] No
  - If multiple discount is possible then is there a criteria on maximum discount because 11 discount codes i.e. 110% discount will cause cash back?

2. Can we assume the following two API's are already available? Can this be stubbed? [UB] We are expecting these two APIs as part of the submission
  - The store also has two admin API's:
    - Generate a discount code if the condition above is satisfied.
    - Lists count of items purchased, total purchase amount, list of discount codes and total discount amount.
  
3. How should the merchant be notified about new coupon code on the nth order? **(email/sms/on UI ?)** [UB] It is automatically applied to the current cart.
