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
  "manifesto.txt": () => {
    return `
Every once in a while a revolutionary idea appears that alters the fabric of our societies. The accompanying behaviours and technologies do not occur by chance; they are the aggregation of ancient trends and the inventiveness of millions. Language, agriculture, parliaments, the printing press, networked computing, blockchains, and artificial intelligence all transformed our world forever, rearranging human societies with a vision for the future. Today, we are bringing forth such a vision.

In a world in which our lives are increasingly digital and borderless, the bureaucratic institutions of the state have been left behind, incapable of providing a peaceful order. The Westphalian system that birthed the nation state is struggling to keep up with a multi-polar, interconnected world. In this paradigm shift, the supra-national global elite is cannibalising its citizens and the fiat monetary system is collapsing in real time.

We see this as the terminal phase of the Western project, a time of debt slavery, war, displacement, manipulation, corruption, broken ecosystems, widespread surveillance, nihilist values, socialised impoverishment, and bipartisan tyranny. Across the world, we are sleepwalking into a series of interdependent catastrophes, the likes of which have not been witnessed in generations. While most believe the situation is hopeless, we know it is not.

To prove it, we are declaring independence from this dying order, reopening the frontier and establishing Logos, a self-sovereign network state founded on the solid ground of liberty, security, privacy, openness, and decentralisation. Logos is the ancient Greek concept for the connection between language, reason, and the order of the universe. To us, it represents a group of thinkers and builders searching for this immanent truth through dialogue, forming a global nation of shared values and like-minded peers.

Our vision is to harness the transformational power of discovering together, building on our deep urge to invent and imagine a world beyond the tyrannical structures of the decaying status quo. Our mission is neither optional nor guided by chance, it is born out of necessity. We are at the critical juncture where the old system meets the new tools built to replace it, and we see no choice but to use them for our collective liberation. We know success is inevitable.

We offer those who join us a liberated territory in cyberspace to interact freely in a passionate and respectful manner. To achieve this independence of the mind and body, we are building a versatile and powerful toolkit. The magic of cryptography gives us privacy, while the resilience of blockchains allows for global, coordinated, coercion-resistant institutions.

These cutting-edge tools are designed to safeguard our basic rights, giving our citizens ownership of these technologies, a voice in their governance, and the opportunity to make a difference. We offer meaning in a world starved of it. We were there at the beginning, when Bitcoin proved this dream was possible. We share its ethos and extend its properties to a user-owned, self-sovereign network state.

Doing this requires taking on the challenge set in the initial vision for Ethereum: a fully decentralised politically neutral tech stack complete with p2p communications, file storage, and a multi-chain ecosystem.

On top of this infrastructure we are establishing a parallel society with voluntary, consensus based governing services, designed for plurality and hard-coded to respect fundamental human rights. This society is governed by a common law court system and a culture of virtues: wisdom, courage, humanity, justice, temperance, and transcendence.

Logos is the next step forward in the evolution of crypto and traces its origins to the founding ideals of the cypherpunk movement. Bitcoin provides single use-case value transactions, Ethereum generalises this for arbitrary functions on a consensus layer, and Logos allows the deployment of arbitrary social institutions while adding network and transaction-level privacy.

What does a world where we succeed look like? What will daily life be like in the network state and how do we solve the problems our citizens face?

In our world, your life is as private as you want it to be. We are not the first to argue that privacy is necessary for an open society in the electronic age. Privacy is not secrecy, it is a fundamental right.

In our world, you own the services you use, no matter if you drive a taxi, start companies, or organise politically. You own your information, your apps, your marketplaces, and your assets. This means a voice in their governance and a stake in their success.

In our world, the rule of law is transparent, fair, and the true basis of our wealth. Our accessible governance system means transactions cost a fraction of what they do in the captured legacy bureaucracy, and that courts are trustworthy and mediation is minimal.

In our world we have a transparent, self-sovereign monetary policy that serves the interests of our citizens.

In our world assets are sovereign and secure, protected legally and technologically from outside and within. Logos is a digital Switzerland of the electronic age.

In our world culture is free, forkable, and open. Freedom of expression is guaranteed by our underlying technology. If you do not agree with what you have consented to, you are always free to leave or remix.

In our world hegemony is replaced by a plurality of heterogeneous communities, sharing a culture of voluntary consent. Hegemony is not only oppressive but inefficient, stifling creativity and limiting the potential for discovery. Logos is the next step in the evolution of society, from warlike and poverty-stricken barbarism to a prosperous civilisation of voluntary harmony.

In our world the answers will not come from one person, one institution, or one group. We believe the smallest minority is the individual, and no individual is untouched by the experience, cultures, and relations they are party to. Hence we enable plurality instead of tolerating or censoring it.

In our world people are not atomised and treated as machines, because people, not machines, are at the centre of what we envision.

Our world is anonymous and non-elitist.

We do not care who you are.

We do not care about your gender, race, or nationality.

We judge ideas on their merit and value through dialogue.

We are people-powered software and we are relevant because of our uncompromising beliefs.

We are bringing about the second enlightenment of the digital world, because the internet was not built for totalitarian control but for prosperity and emancipation.

We also believe no one is free until we are all free, because no one is an island — we are all pieces of the main.

We know there is going to be a pushback on what we create, but the reward is a freedom nobody has ever felt before.

We will stop only when anybody, anywhere, can experience it.    
  `;
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

Logos is building a fully decentralised technology stack
that provides the necessary support for self-sovereign virtual territories. 
Following the original cypherpunk, the stack includes three blockchain-based protocols:
decentralised storage, private messaging, and a next generation layer 1. 

When combined, they provide the technical foundation for
truly decentralised applications, network states, or any borderless public institution.

We are looking for operators are the first entry point into our new ecosystem,
pioneers of a new jurisdiction in cyberspace. 

We're rebuilding the internet. Inscribe your place among us.

Type 'help' to see list of available commands.
Available commands: apply, help, theme, manifesto.txt`;

    displayTextLetterByLetter("banner", text);

    return "";
  },
};
