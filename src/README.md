toast提示框

## Installation
```
import toast from '@za/react-toast';
```

## API
- content 必填 toast提示的内容，支持html标签
- duration 可选，提示的时间，默认1500毫秒，0则一直显示
- 返回值：null

## Usage
```
toast('成功了');

toast('成功了', 3000);

toast('成功了', 0);
```
