type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const todos: Todo[] = [
  { id: 1, text: "Nauczyć się TypeScript", done: false },
  { id: 2, text: "Odpalić projekt przez Vite", done: true },
];

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Nie znaleziono elementu #app");
}

function renderTodos(items: Todo[]): void {
  app.innerHTML = `
    <h1>Moja lista zadań</h1>

    <form id="todo-form">
      <input id="todo-input" type="text" placeholder="Nowe zadanie..." />
      <button type="submit">Dodaj</button>
    </form>

    <ul>
      ${items
        .map(
          (todo) => `
            <li>
              <label>
                <input 
                  type="checkbox" 
                  data-id="${todo.id}" 
                  ${todo.done ? "checked" : ""}
                />
                ${todo.done ? `<s>${todo.text}</s>` : todo.text}
              </label>
            </li>
          `
        )
        .join("")}
    </ul>
  `;

  const form = document.querySelector<HTMLFormElement>("#todo-form");
  const input = document.querySelector<HTMLInputElement>("#todo-input");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!input || input.value.trim() === "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input.value.trim(),
      done: false,
    };

    todos.push(newTodo);
    renderTodos(todos);
  });

  const checkboxes = document.querySelectorAll<HTMLInputElement>(
    "input[type='checkbox'][data-id]"
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const id = Number(checkbox.dataset.id);
      const todo = todos.find((item) => item.id === id);

      if (todo) {
        todo.done = checkbox.checked;
        renderTodos(todos);
      }
    });
  });
}

renderTodos(todos);
