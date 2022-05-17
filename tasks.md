
### Feature: persistence
#### Tasks
##### T1: Add loading/saving todos to firebase
In this task, we are going to implement a simple firebase connectivity inside the Todo widget. 
The TodoHome will select Todos and render them. A new Todo will be added to the DB, and when the Complete status is changed, the item will be updated.
##### T2: 
Use the framework store User to store todos under a specific user.
##### T3:
Externalise DB settings. The Todo widget (like any proper widget) is designed to be plug and play, so this task is about finding a way to decouple the DB configuration from the widget. There are many options here, like completely abstracting away DB access, or we can say this particular widget uses Firebase, so it will need to be configured with a Firebase db. I will go for this as a first version for understandable reasons. We should find a way that works simply with other widgets in a Firebase environment.