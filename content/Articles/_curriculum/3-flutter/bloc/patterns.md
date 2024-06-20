# Flutter Clean Architecture with Bloc
Pattern for organizing code so it can be reused, understood, & tested in Flutter

https://imgur.com/a/OXesdFz

## Project Structure

![Preview](https://i.imgur.com/XvzccFZ.png)

- [ ] Presentation
  - [ ] Pages
  - [ ] Widgets
  - [ ] Presentation
    - [ ] "Logic Holders"
    - [ ] BLoC
    - [ ] Change Notifiers

- [ ] Domain(Use Cases)
  - [ ] Use Cases
  - [ ] Repositories
    - [x] Defines contract the repo must do. Interface/Abstract Classes

- [ ] Data(Entities)
  - [x] Repositories
    - [x] Defines how the data is "gotten". Implements Abstract class of domain class
  - [x]  Data Source
    Either remote or local. Depending on internet connection of the device.
    Check if internet then get fresh data. If not then use cached data.
    Cache ASAP so there's always something available(last cached value).
    - [x] Remote
      - [x] Perform API Requests
      - [x] Makes request to remote API/DB
    - [x] Local
      - [ ] Uses shared preferences package
      - [ ] Device/Cache/DB

## 3 Main concepts

- [ ] Presentation
  - [ ]
  - [ ] 
  - [ ] 
  - [ ] 
- [ ] Domain
- [ ] Data

## Troubleshooting

- [ ] 