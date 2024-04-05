import args from 'args';
import {buildAllPlatform} from './transform';


(() => {
  args
  .option("theme", "carbon or fluent")
  .option('in', "json folder contain tokens", './tokens')
  .option('out', "json folder contain tokens", './build');

  const flags = args.parse(process.argv, { name: "transform-tokens" } as unknown as undefined);

  if (!flags.theme || flags.in.length === 0)
	{
		console.error("Specify at least one input tokens folder with --in.\n")
		args.showHelp()
		return
	}

  buildAllPlatform({
    buildPath: flags.out as string,
    platform: flags.theme,
    rootFolder: flags.in
  })
})()