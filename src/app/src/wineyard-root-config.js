import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@wineyard/scaffold",
  app: () => System.import("@wineyard/scaffold"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
