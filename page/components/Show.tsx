import { Button } from 'antd';
import React from 'react';
import { open } from '../../lib/dist';

import './show.less';

const Show = () => {
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
                            你还可以通过双击头部或者头部菜单扩展按钮实现全屏并固定，解除也是同样的操作
                        </li>
                        <li>
                            You can also double-click the header or the header menu expansion button to achieve full screen and fixed,the unbinding is also the same operation
                        </li>
                        <br></br>
                        <li>
                            如果你不想遮挡整块屏幕，你还可以尝试拖动至窗口左右边缘处实现半屏固定，如果拖拽至上下边缘，则等同于全屏
                        </li>
                        <li>
                            If you don't want to cover the entire screen, you can also try dragging it to the left or right edge of the window to achieve a half-screen fix. If you drag it to the top or bottom edge, it is equivalent to full screen
                        </li>
                        <br></br>
                        <li>
                            如果你懒得移动鼠标，也可以用键盘操作，其中 esc 代表关闭操作，enter 代表确认操作
                        </li>
                        <li>
                            If you are too lazy to move the mouse, you can also use the keyboard to operate the currently focused dialog box. The Esc key represents the close operation, and the Enter key represents the confirm operation.
                        </li>
                        <br></br>
                        <li>
                            react-dialogbox 提供了所有事件的钩子函数，包括拖拽移动，变大缩小，全屏等，但我并不建议你们使用这些仅与 UI 相关的钩子
                        </li>
                        <li>
                            react-dialogbox provides hook functions for all events, including dragging, resizing, full-screen, etc. Although I have implemented throttling, I still do not recommend using these hooks that are solely related to the UI.
                        </li>
                        <br></br>
                        <li>
                            虽然我很愿意将 React 依赖升级至最新版本，但考虑到大部分开发者使用的并非 18+ 的最新版本，为了兼容性，所以 React 仍保留在旧版本
                        </li>
                        <li>
                            Although I am willing to upgrade the React dependency to the latest version, considering that the majority of developers are not using the latest version 18+, for compatibility reasons, the React dependency remains in the old version.
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
                        如果你觉得窗口太小，可以尝试在对话框边缘处拖动，Dialogbox 提供了在二维平面上八个方向（含对角线）上的扩大和缩小的操作
                    </li>
                    <li>
                        If you think the window is too small, you can try dragging the edges of the dialog box, dialogbox supports expansion and scaling in the vertical and horizontal directions, as well as on both diagonal axes. This means that you can flexibly adjust the UI layout in various ways using diagonal movements
                    </li>
                    <br></br>
                    <li>
                        或许你没有发现，这其实是两个对话框，你可以尝试按住头部移开上面的这个
                    </li>
                    <li>
                        Perhaps you haven't noticed that there are actually two dialog boxes. You can try to press and hold the head to move away from the upper one
                    </li>
                    <br></br>
                    <li>
                        尝试点击另一个对话框，你会发现它们可以聚焦，类似操作系统的窗口
                    </li>
                    <li>
                        Try clicking on another dialog box and you'll find that they can be focused, similar to the windows of the operating system.
                    </li>
                </ul>
            })
        }}>点击展示对话框</Button>

        <Button type='primary' style={{ marginLeft: 20 }} onClick={() => {
            const { close } = open({
                width: 600,
                height: 480,
                onCancel: () => {
                    close()
                },
                onOk: () => {
                    close()
                },
                title: '补充说明',
                children: <>
                    <ul>
                        <li>
                            虽然我很乐意将 React 依赖升级至最新版本，但考虑到大部分开发者使用的并非 18+ 的最新版本，为了兼容性，所以 react-dialogbox 2+ 的 React 仍保留在旧版本
                        </li>
                        <li>
                            Although I am happy to upgrade my React dependencies to the latest version, considering that most developers are not using the latest version of 18+, for compatibility reasons, the React version of react-dialogbox 2+ remains in the old version
                        </li>
                        <br></br>
                        <li>
                            但是最新的 react-dialogbox 3+ 版本采用了 18+ 的 react，使用 function Component 重写， 并且采用了 provider 内嵌的构造，不再通过原生 dom api 创建，与 react 更加契合，这也使得 redux mobx 等需要 provider 包裹的应用能够在 api 生成的 dialogbox 起作用
                        </li>
                        <li>
                            However, the latest react-dialogbox 3+ version uses 18+ react, rewrite using function Component, and uses provider embedded construction, no longer creating through native dom api, which is more compatible with react. This also enables applications that require provider wrapping, such as redux mobx, to work with api-generated dialogbox.
                        </li>
                        <br></br>
                    </ul>
                </>
            })
        }}>补充说明</Button>
    </div>
}

export default Show