# Date - 01/30/2023
## Questions
1. The second admin api is returning List of Discount codes,
  - Why do we need to return list of discount/coupon codes?
  - Can the merchant use multiple discount/coupon codes on a single order (i.e., will applying 2 discount codes give 20% discount)?
  - If multiple discount is possible then is there a criteria on maximum discount because 11 discount/coupon codes i.e. 110% discount will cause cash back?

2. Can we assume the following two API's are already available? Can this be stubbed?
  - The store also has two admin API's:
    - Generate a discount code if the condition above is satisfied.
    - Lists count of items purchased, total purchase amount, list of discount codes and total discount amount.
  
3. How should the merchant be notified about new coupon code on the nth order? **(email/sms/on UI ?)**

[Waiting for response]

# Date - 01/31/2023
## Assumption

1. Assuming coupon code will be created on the nth order and will be valid until the next nth order.
2. The coupon code can be used until the next nth order. (coupon validity)
3. Next new coupon will be generated on the next nth order, and previous coupon will be invalidated if not used.
