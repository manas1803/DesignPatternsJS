# Webpack Introduction

## Why Modules ?
1) Maintainiability: - Modules can be added and removed according to use case without disturbing the whole code
2) Readability: - Modules create a section for specific purpose thus making the code more readable.
3) Namespacing: - In JS we have the concept of global variables, and global variables are accessible for all, so if we don't have proper encapsulation(which is provided by modules) then we will end up sharing variables across different code where the variable might not be required causing **namespace pollution**. 