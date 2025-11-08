# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - link "Logo" [ref=e5] [cursor=pointer]:
      - /url: /
      - heading "Logo" [level=3] [ref=e6]
    - generic [ref=e7]:
      - link "Login" [ref=e8] [cursor=pointer]:
        - /url: /login
      - link "Sign Up" [active] [ref=e9] [cursor=pointer]:
        - /url: /signup
  - generic [ref=e11]:
    - generic [ref=e12]:
      - heading "Create Account" [level=2] [ref=e13]
      - paragraph [ref=e14]: Sign up to get started
    - generic [ref=e16]:
      - generic [ref=e17]:
        - paragraph [ref=e19]: Email
        - textbox "Email" [ref=e20]:
          - /placeholder: you@example.com
      - generic [ref=e21]:
        - paragraph [ref=e23]: Password
        - textbox "Password" [ref=e24]:
          - /placeholder: ••••••••
      - generic [ref=e25]:
        - paragraph [ref=e27]: Confirm Password
        - textbox "Confirm Password" [ref=e28]:
          - /placeholder: ••••••••
      - button "Create Account" [ref=e29]
```