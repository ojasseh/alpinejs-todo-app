window.todoStore = {
	todos: JSON.parse(localStorage.getItem('todo-store') || '[]'),

	save() {
		localStorage.setItem('todo-store', JSON.stringify(this.todos))
	}
}

window.Todo = function (body) {
	this.id = Date.now();
	this.body = body;
	this.completed = false;
}

window.todos = function () {
	return {

		...todoStore,
	
		filter: "all",

		// todos: [],

		editedTodo: null,

		get active() {
			return this.todos.filter((todo) => !todo.completed);
		},

		get completed() {
			return this.todos.filter((todo) => todo.completed);
		},

		get filteredTodos() {
			return {
				all: this.todos,
				active: this.active,
				completed: this.completed,
			}[this.filter];
			if (this.filter === "all") {
				return this.todos;
			}

			if (this.filter === "active") {
				return this.active;
			}

			if (this.filter === "completed") {
				return this.completed;
			}
		},

		get allComplete(){
			return this.todos.length === this.completed.length
		},

		newTodo: "",

		addTodo() {
			if (!this.newTodo) return;

			/* this.todos.push({
				id: Date.now(),
				body: this.newTodo,
				completed: false,
			}); */
			this.todos.push(new Todo(this.newTodo));

			this.save();

			this.newTodo = "";
		},

		editTodo(todo) {
			todo.cachedBody = todo.body;

			// console.log(todo);
			this.editedTodo = todo;

			
		},

		editComplete(todo) {
			if (todo.body.trim() === "") {
				return this.deleteTodo(todo);
			}
			this.editedTodo = null;

			this.save();
		},

		cancelEdit(todo) {
			todo.body = todo.cachedBody;

			this.editedTodo = null;

			delete todo.cachedBody;
		},

		completeTodo(todo) {
			todo.completed = true;
		},

		deleteTodo(todo) {
			let position = this.todos.indexOf(todo);

			this.todos.splice(position, 1);

			this.save();
		},

		pluralize(text, count) {
			return count === 1 ? text : text + "s";
		},

		toggleTodo(todo) {
			todo.completed = !todo.completed;

			this.save();
		},

		toggleAllComplete() {
			let allComplete = this.allComplete;

			this.todos.forEach(todo => todo.completed = ! allComplete);

			this.save();
		},

		clearCompletedTodos() {
			
			this.todos = this.active;

			this.save();
		}
	};
};
