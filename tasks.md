
### Feature: persistence
#### Tasks
##### T1: Add loading/saving todos to firebase
In this task, we are going to implement a simple firebase connectivity inside the Todo widget. 
The TodoHome will select Todos and render them. A new Todo will be added to the DB, and when the Complete status is changed, the item will be updated.

17/05
Working on the update now, and passing events from child components via the abstract components seems like a pain. With GC only it was sort of doable, just sticking on the on: tag
but now we have container, that would need to pass that down to its GC child. Besides the technical issue, it also raises the more important problem of tight coupling. For the Todo example its not an issue, of course, but in future parent components should not make any such assumptions about their children unless we make it part of the component contract. Which we could actually. So in the first instance we should still try to make the property passing work.

Good discussion here
https://github.com/sveltejs/svelte/issues/2837

22/07
Actually this might be a non-issue for now. The original goal was not to have to include the logic to render/not render todo items in the parent. Now basically the DetailsDesktopComponent has the logic to pull in the showComplete piece of state, and the node's done field. So there's no need for the child to communicate that it's done status changed. Yes, it's still something that's potentially interesting and it's unclear how to do as yet. Also on that note, we can use store updates to trigger any functionality, don't forget that. With the $: thing, we can trigger code to execute on state change :) So, in theory we don't need any eventing mechanism at all. 

##### T2: 
Use the framework store User to store todos under a specific user.
##### T3:
Externalise DB settings. The Todo widget (like any proper widget) is designed to be plug and play, so this task is about finding a way to decouple the DB configuration from the widget. There are many options here, like completely abstracting away DB access, or we can say this particular widget uses Firebase, so it will need to be configured with a Firebase db. I will go for this as a first version for understandable reasons. We should find a way that works simply with other widgets in a Firebase environment.