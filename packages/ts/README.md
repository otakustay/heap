# ts 化脚本

## What

把所有的 js 和 jsx 文件重命名为 ts 和 tsx 文件。在这个过程，会识别是否用到了 jsx 语法，来决定后缀名。

然后，给每个重命名的文件头添加 `// @ts-nocheck` 来跳过检查。

## Why

重命名为 ts 文件最大的好处在于，你可以使用 ts 语法了。

一开始，tsc 就可以通过 allowJs 来运行 js 文件，或者可以通过 babel 来平等的编译 js 和 ts。但无论如何，你不能在 js 里面突兀的写上一个 type。

虽说 ts 是 js 的超集，但 tsc 给出的各类检查错误却让人望而却步。事实上，migration 不该这么难，而应该更为轻松一些。借助 typescript@3.7 的新特性 `// @ts-nocheck` 就可以实现快速的 ts 化。

这样你就可以马上开始使用 ts 语法了，其中也包括了各项 js 中进入了 stage 3 的语法。

在合适的时候，你再去掉 `// @ts-nocheck` 即可开启类型检查。

## How

注意脚本会使用 git 命令，所以需要在你的项目文件夹下运行

```shell script
node ~/heap/packages/ts/index.js src
```

完成后，脚本会键入 git commit 开启一个 vim，然后你需要输入一个 commit message

脚本完成后，你还需要 `git add .` 并进行相应的检查和改动，再加入一个 commit

这里需要有两个 commit，我们希望 git 产生 rename + modify 的两个 commit，而不是 add & remove 的一个 commit，后者会丢失所有的 git history 信息。

如果有其他更好的办法，可以告诉我，以此改进这个脚本。
