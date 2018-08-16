# Example: Petstore

* `petstore.yaml`, the copy of original example.

I refatoried the original one into multiple files as below:

* `pets.yaml`, endpoints about listing and looking up pets.
* `orders.yaml`, endpoints about listing and updating orders.
* `users.yaml`, endpoints about listing and managing users.
* `login.yaml`, endpoints about doing login and logout.
* `common/info.yaml`, pieces shared by files above containing documents.
* `common/security.yaml`, pieces shared by files above containing security rules.