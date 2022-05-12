### 1. Conditionality
Nodes should be queried whether they can be rendered. This is an important step towards a fully generic approach. Say, you have 3 pages in a webapp, where 1 page is only available if the user has admin privileges. Now when you render the list of nodes, each time the node needs to be queried if it is to be included in the render (visible or something.) Since at the bottom of this, the application written with nodez are fully reactive, nodes can easily change their visible property and go hidden at any time (say user marks a todo complete, which should not be showing in the list).

-> This has been implemented for todos. Nodes have a NodeHandler interface where they can specify various methods. Currently isVisible is supported.

### 2. Indirection, decoupling, plug and play
State frameworks like Redux drive people to write monolithic applications, where things get plumbed together in a mesh of actions, etc. So it is very difficult to extract and reuse anything. Components therefore either do their own backend calls etc (which is ridiculous - why do we have Redux at all if that is the case) or they don't really participate in the application logic, they're low level components, taking params and emitting actions, but again, they get fully wired into the application.

Nodez could do better, by providing a plugin-architecture, where things are not directly joined or coupled with each other. At the minute it's not entirely clear, but I know this is important. I want a framework that is truly composable, and lego-like, where things are easy to combine and reuse.

### 3. Styling / theming
This is also quite big. If (see #2) things are built in a plug-and-play manner, we should find a way how widgets or nodes can render in a way that's driven by the target application. Besides this, it would be desirable to provide theming, where this central design is easy to switch, even at runtime (light/dark for example)

### 4. External / Internal rendering of a node
To be generic, nodes cannot render other nodes. They need to use generic rendering and passing the node to it. Say you have a page node, which has children. In the first go of the Pages example, I simply rendered them as text and a link etc. This is not correct especially if we think about adding nodes to children dynamically (compatible or allowed nodes, whose exact type and representation is unknown to the node rendering them). One quick idea here. If a Page widget is rendering Page children, it can make use of this fact and bypass a full generic lookup for the appropriate renderer. Also, another idea (needs to be checked). Generic component can cache the actual renderer if one has been identified, so upcoming renders should not result in widget lookups. This information can be in fact saved in the node data itself. This latter idea may make the one earlier (page rendering page nodes etc) superfluous - keeping things simple is more important here.

So very simply put, each node is to be rendered externally except for the one which is active. Which leads us over to the question of node navigation. However, I'm not even sure about this. Imagine that you 'expand' some nodes, but you leave them 'open'. So is this navigation? If so, if you can have multiple open nodes, what's the point in having the external or internal distinction. I think node state is more appropriate here. Nodes have a default state which corresponds roughly to the 'external' view of a widget. So it's basically the node state that will drive this.

- [x] [03 May 2022 - this has been now implemented.]

### Refactor Todo app
I don't quite like how the todo app has this list thing, it renders todos, adds the checkbox to
show/hide completed items. Yesterday I was thinking that this whole 'trigger' business is not necessary. This node structure should use the same store, and therefore changes will be picked up by using normal Svelte mechanisms. So in concrete terms, we will have another Widget, TodoHome which will render its children which are Todos. This also solves the problem of this ugly Collection business, so back to the simple model of having a graph of nodes, which are rendered by their registered renderers.

Now this also shows another problem which I want to solve. Currently widgets are not organised into a hierarchy, so this would result in the following:

TodoHome - NodeHomeWidget
Todo - TodoWidget
etc.

What I would like to see is more like this:

page - PageWidget
todo - TodoHomeWidget 
       TodoWidget

So basically packages of widgets. But this is of course a problem because we want to be able look up widgets using a simple registry (based on the value object's class type).

The WidgetRegistry currently reads the list of widget names and iterates over them, processing the WidgetInfos. This could be extended by introducing a list of widgets inside the widget. I don't think a full recursive approach is warranted here, we simply need another level, with the widgets implementing the behaviour for the package. So this is quite straightforward to implement. There's one more thing to bear in mind, it's unique names. So in the Todo package (which will be the todo home widget), we'll have a TodoDetails widget. Now these will map to node value types Todo and TodoDetails respectively. We could introduce a concept of package. Node instances would be created with the package string as a prefix and the type getter would return:

Todo/Todo
Todo/TodoDetails

By simply using the entry level widget name as package (therefore the 'master' or 'home' widget for each package would be in the form of Widget/Widget). This would be the widget for rendering the root of the node graph. 