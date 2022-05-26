# Simple Build Tools

Simple tools for building a nodejs project

<hr>

## Functions

<dl>
<dt><a href="#toProm">toProm(fcn)</a> ⇒ <code>Promise</code></dt>
<dd><p>Convert a callback executing asynchronouse function into a promise returning one</p>
</dd>
<dt><a href="#copyFile">copyFile(src, dest)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Copy a single file</p>
</dd>
<dt><a href="#copyDir">copyDir(src, dest)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Copy an entire directory</p>
</dd>
<dt><a href="#transformFile">transformFile(src, dest, transform)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Copy and transorm a file</p>
</dd>
<dt><a href="#assertDir">assertDir(dir)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Ensure that a directory exists</p>
</dd>
<dt><a href="#assertParentDir">assertParentDir(file)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Ensure that a file&#39;s parent directory exists</p>
</dd>
<dt><a href="#rmrf">rmrf(path)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>remove contents recursively</p>
</dd>
<dt><a href="#runAndReport">runAndReport(task)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Run a build task and report it&#39;s time and result</p>
</dd>
<dt><a href="#series">series(tasks)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>join a set of tasks in series</p>
</dd>
<dt><a href="#parallel">parallel(tasks)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>join a set of tasks in parallel</p>
</dd>
<dt><a href="#runTasks">runTasks(task)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>run a task an report it&#39;s time and result</p>
</dd>
<dt><a href="#webpack">webpack(config)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Run webpack and report the result</p>
</dd>
<dt><a href="#zipDirectory">zipDirectory(sourceDir, outPath)</a> ⇒ <code>Promise</code></dt>
<dd></dd>
</dl>

<a name="toProm"></a>

## toProm(fcn) ⇒ <code>Promise</code>
Convert a callback executing asynchronouse function into a promise returning one

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fcn | <code>function</code> | asynchronous function that executes a callback |

<a name="copyFile"></a>

## copyFile(src, dest) ⇒ <code>Promise.&lt;void&gt;</code>
Copy a single file

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | path to the source file |
| dest | <code>string</code> | path to the destination file |

<a name="copyDir"></a>

## copyDir(src, dest) ⇒ <code>Promise.&lt;void&gt;</code>
Copy an entire directory

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | path to the source directory |
| dest | <code>string</code> | path to the destination directory |

<a name="transformFile"></a>

## transformFile(src, dest, transform) ⇒ <code>Promise.&lt;void&gt;</code>
Copy and transorm a file

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | path to the source file |
| dest | <code>string</code> | path to the destination file |
| transform | <code>function</code> | text transforming funciton |

<a name="assertDir"></a>

## assertDir(dir) ⇒ <code>Promise.&lt;void&gt;</code>
Ensure that a directory exists

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>string</code> | the path to the directory that must exist |

<a name="assertParentDir"></a>

## assertParentDir(file) ⇒ <code>Promise.&lt;void&gt;</code>
Ensure that a file's parent directory exists

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | the path to the file whose parent must exist |

<a name="rmrf"></a>

## rmrf(path) ⇒ <code>Promise.&lt;void&gt;</code>
remove contents recursively

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the path of the item to be removed |

<a name="runAndReport"></a>

## runAndReport(task) ⇒ <code>Promise.&lt;void&gt;</code>
Run a build task and report it's time and result

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>function</code> | a build task that should be timed and reported |

<a name="series"></a>

## series(tasks) ⇒ <code>Promise.&lt;void&gt;</code>
join a set of tasks in series

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tasks | <code>Array.&lt;function()&gt;</code> | tasks to join |

<a name="parallel"></a>

## parallel(tasks) ⇒ <code>Promise.&lt;void&gt;</code>
join a set of tasks in parallel

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tasks | <code>Array.&lt;function()&gt;</code> | tasks to join |

<a name="runTasks"></a>

## runTasks(task) ⇒ <code>Promise.&lt;void&gt;</code>
run a task an report it's time and result

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>function</code> | task to run and report time and result |

<a name="webpack"></a>

## webpack(config) ⇒ <code>Promise.&lt;string&gt;</code>
Run webpack and report the result

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | the webpack config and report result |

<a name="zipDirectory"></a>

## zipDirectory(sourceDir, outPath) ⇒ <code>Promise</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| sourceDir | <code>String</code> | path to directory to zip |
| outPath | <code>String</code> | path to zip file to create |

