import { Button } from 'antd';
import React from 'react';

// import { open } from 'react-dialogbox';
import { open, hideDialogbox } from '../../lib/src';

import './show.less';

const Show = (props) => {
    return <div className="show">
        <Button type='primary' onClick={() => {
            const { close } = open({
                width: 600,
                height: 480,
                onCancel: () => {
                    close()
                },
                onOk: () => {
                    close()
                },
                title: '窗口1',
                children: <>
                    <ul>
                        <li>
                            你还可以通过双击头部或者扩展按钮实现全屏并固定，还原也是同样的操作
                        </li>
                        <br></br>
                        <li>
                            如果你不想遮挡整块屏幕，你还可以尝试拖动至窗口左右边缘处实现半屏固定，如果拖拽至上下边缘，则等同于全屏
                        </li>
                        <br></br>
                        <li>
                            如果你不想移动鼠标，react-dialogbox 还提供了键盘事件，其中 esc 代表 cancel 事件，enter 代表 ok 事件
                        </li>
                        <br></br>
                        <li>
                            react-dialogbox 提供了所有事件的钩子函数，除了 onOk，onCancel 以外还包括了拖拽移动，变大缩小，全屏等，但我并不建议你们使用这些仅与 UI 相关的钩子
                        </li>
                    </ul>
                </>
            })
            const { close: close2 } = open({
                onCancel: () => {
                    close2()
                },
                onOk: () => {
                    close2()
                },
                title: '窗口2',
                width: 680,
                height: 480,
                children: <ul>
                    <li>
                        如果你觉得窗口太小，可以尝试在对话框边缘处拖动，对话框提供了在二维平面上八个方向（含对角线）上的扩展和收缩的操作
                    </li>
                    <br></br>
                    <li>
                        或许你没有发现，界面实际上存在了两个对话框，你可以尝试按住头部移开上面的这个
                    </li>
                    <br></br>
                    <li>
                        尝试点击另一个对话框，你会发现它们可以类似操作系统的窗口一样被聚焦，
                    </li>
                </ul>
            })
        }}>点击演示</Button>
    </div>
}

export default Show