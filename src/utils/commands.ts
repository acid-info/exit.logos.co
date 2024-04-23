import packageJson from "../../package.json";
import themes from "../../themes.json";
import { history } from "../stores/history";
import { theme } from "../stores/theme";

const hostname = window.location.hostname;

export const commands: Record<
  string,
  (args: string[]) => Promise<string> | string
> = {
  apply: async () => {
    const htmlString = `<template>
<form class="apply-form" onsubmit="handleSubmit(event)">
  <br/>
  <label for="form-name">Taproot BTC address (required)</label>
  <input class="apply-input" id="form-btc" placeholder="Enter here" required />
  
  <button class="apply-submit">Submit</button>
</form>
</template>`;

    return htmlString;
  },
  help: () => {
    // const commandsList = Object.keys(commands);
    // const lineBreak = commandsList.findIndex((c) => c === "echo");

    // const list =
    //   commandsList.slice(0, lineBreak).join(", ") +
    //   "\n" +
    //   commandsList.slice(lineBreak).join(", ");
    // return "Available commands: " + list;

    const commandsList = Object.keys(commands);
    const filteredCommands = commandsList.filter(
      (command) => command !== "banner"
    );

    return `Available commands: ${filteredCommands.join(", ")}`;
  },
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case "ls": {
        let result = themes.map((t) => t.name.toLowerCase()).join(", ");
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return `<template><span class="theme-list">${result}</span></template>`;
      }

      case "set": {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        document.documentElement.style.setProperty(
          "--text-color",
          `${t.foreground}`
        );

        document.documentElement.style.setProperty("--green", `${t.green}`);

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  banner: () => {
    function displayTextLetterByLetter(
      elementClass: any,
      text: any,
      minDelay = 1,
      maxDelay = 10
    ) {
      const elements = document.getElementsByClassName(elementClass);
      const element = elements[elements.length - 1];
      if (!element) return;

      // Append cursor initially
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      element.appendChild(cursor);

      let currentIndex = 0;

      function displayNextLetter() {
        if (currentIndex < text.length) {
          let charToAdd = text[currentIndex];
          if (text.substr(currentIndex, 4) === "<br>") {
            charToAdd = "<br>";
            currentIndex += 4;
          } else {
            currentIndex++;
          }

          // Insert the character or <br> before the cursor
          if (charToAdd === "<br>") {
            const brElement = document.createElement("br");
            element?.insertBefore(brElement, cursor);
          } else {
            const textNode = document.createTextNode(charToAdd);
            element?.insertBefore(textNode, cursor);
          }

          let randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
          setTimeout(displayNextLetter, randomDelay);
        } else {
          // If all characters are added, remove the cursor
          cursor.style.display = "none";
          const baner = document.getElementsByClassName("banner")[0];
          if (baner) {
            // delete the banner
            baner.remove();
            // add the banner to the history
            history.update((h) => [
              ...h,
              { command: "banner", outputs: [text] },
            ]);
          }
        }
      }

      displayNextLetter();
    }

    const text = `███████╗██╗  ██╗██╗████████╗     ██████╗  █████╗ ███╗   ███╗███████╗
██╔════╝╚██╗██╔╝██║╚══██╔══╝    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝
█████╗   ╚███╔╝ ██║   ██║       ██║  ███╗███████║██╔████╔██║█████╗  
██╔══╝   ██╔██╗ ██║   ██║       ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  
███████╗██╔╝ ██╗██║   ██║       ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗
╚══════╝╚═╝  ╚═╝╚═╝   ╚═╝        ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝                                               

Logos is an independent cyberstate, a new territory in cyberspace.
We are building a fully decentralised anonymous tech stack, the original vision for web 3.
Operators are the first entry point into our new ecosystem, a privilege reserved for the diasporas of the physical world.
These early inhabitants will inherent  the rights of the new jurisdiction in cyberspace.

Type 'help' to see list of available commands.
Available commands: apply, help, theme`;

    displayTextLetterByLetter("banner", text);

    return "";
  },
};
