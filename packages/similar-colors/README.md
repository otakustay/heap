# 寻找系统中的非标准颜色

## 使用

```shell
node index.js [dirs...]
```

会检查指定的目录下所有的`.js`、`.jsx`, `.css`、`.less`文件。注意目录要尽量精确，如不要把`node_modules`包含进去。

## Options

`--same`: 只搜索完全相同的颜色

`--ext`: 指定文件后缀，用法 `--ext less` 或 `--ext less,css`

`--write`: 搜索的同时修改文件

使用以上 option 可以快速替换变量:

```shell
node index.js somepath/src --same --ext less --write
```
