import packageJson from "../../package.json";
import themes from "../../themes.json";
import { history } from "../stores/history";
import { theme } from "../stores/theme";

export const hostname = window.location.hostname;

export const ascii = `███████╗██╗  ██╗██╗████████╗     ██████╗  █████╗ ███╗   ███╗███████╗
██╔════╝╚██╗██╔╝██║╚══██╔══╝    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝
█████╗   ╚███╔╝ ██║   ██║       ██║  ███╗███████║██╔████╔██║█████╗  
██╔══╝   ██╔██╗ ██║   ██║       ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  
███████╗██╔╝ ██╗██║   ██║       ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗
╚══════╝╚═╝  ╚═╝╚═╝   ╚═╝        ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝

`;

export const banner = `We are taking back the internet.

Against the rise of the corporate-Net, we are building a counter-Net

A censorship resistant, decentralised technology stack that provides
the support for independent virtual territories.
Following the original cypherpunk vision, it includes three blockchain protocols with
built in network level privacy:
decentralised storage, private messaging, and a next-generation layer 1. 

We are looking for high level Operators on our mission to liberate the internet,
re-open the frontier and exit the current status quo.
Each Operator is a counter-Net identity and the first entry point into our new ecosystem,
the pioneers of a sovereign enclave in cyberspace. 

Don't just survive while waiting for our revolution to clear your head.
We are rebuilding the internet. Inscribe your place among us. 

Apply to be Blacklisted

Type 'help' to see list of available commands.
Available commands: apply, help, theme, manifesto.txt`;

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
  "manifesto.txt": () => {
    return `<template><br/><a class="link" href="https://logos.co/manifesto/" target="_blank">https://logos.co/manifesto</a>
</template>
`;
  },
  banner: () => {
    function displayTextLetterByLetter(
      id: any,
      content: any,
      minDelay = 1,
      maxDelay = 10
    ) {
      const element = document.getElementById(id);
      if (!element) return;

      // Append cursor initially
      const cursor = document.createElement("span");
      cursor.className = "cursor";

      element.appendChild(cursor);

      let currentIndex = 0;

      function displayNextLetter() {
        if (currentIndex < content.length) {
          let charToAdd = content[currentIndex];
          if (content.substr(currentIndex, 4) === "<br>") {
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
          cursor.style.display = "none";

          const element = document.getElementById(id);

          if (element?.id === "banner") {
            history.update((h) => []);
          }

          return "";
        }
      }

      displayNextLetter();
    }

    displayTextLetterByLetter("ascii", ascii);

    setTimeout(() => {
      displayTextLetterByLetter("banner", banner);
    }, 2800);

    return "";
  },
};
