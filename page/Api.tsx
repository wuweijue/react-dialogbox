import { Form, Table } from 'antd';
import React from 'react';
import './api.less'


const Api = () => {
    return <div className="api">
        <Form>
            <Form.Item>
                <Table
                    pagination={false}
                    title={() => <h3>Dialogbox component props</h3>}
                    columns={[
                        {
                            title: '参数 param',
                            dataIndex: 'prop',
                            key: 'prop',
                            width: 160
                        },
                        {
                            title: '说明 description',
                            dataIndex: 'description',
                            key: 'description',
                            width: 320
                        },
                        {
                            title: '类型 type',
                            dataIndex: 'type',
                            key: 'type',
                            width: 320
                        },
                        {
                            title: '默认值 dafaultValue',
                            dataIndex: 'dafaultValue',
                            key: 'dafaultValue',
                        },
                    ]}
                    dataSource={[
                        {
                            prop: 'title',
                            description: '标题',
                            type: 'string | JSX.Element',
                            dafaultValue: '',
                        },
                        {
                            prop: 'children',
                            description: '对话框内容',
                            type: 'string | JSX.Element',
                            dafaultValue: '',
                        },
                        {
                            prop: 'visible',
                            description: '是否可见',
                            type: 'boolean',
                            dafaultValue: 'false',
                        },
                        {
                            prop: 'mask',
                            description: '遮罩层阴影',
                            type: 'boolean',
                            dafaultValue: 'true',
                        },
                        {
                            prop: 'maskClosable',
                            description: '是否允许点击阴影关闭',
                            type: 'boolean',
                            dafaultValue: 'false',
                        },
                        {
                            prop: 'width',
                            description: '对话框宽度 >=200',
                            type: 'number | number + px | number + %',
                            dafaultValue: '400',
                        },
                        {
                            prop: 'height',
                            description: '对话框高度 >=120',
                            type: 'number | number + px | number + %',
                            dafaultValue: '200',
                        },
                        {
                            prop: 'fullScreen',
                            description: '初始时是否全屏',
                            type: 'boolean',
                            dafaultValue: 'false',
                        },
                        {
                            prop: 'draggable',
                            description: '是否允许拖拽',
                            type: 'boolean',
                            dafaultValue: 'true',
                        },
                        {
                            prop: 'header',
                            description: '是否展示头部',
                            type: 'boolean',
                            dafaultValue: 'true',
                        },
                        {
                            prop: 'isModal',
                            description: '是否是模态框（区别于非模态框）',
                            type: 'boolean',
                            dafaultValue: 'false',
                        },
                        {
                            prop: 'footer',
                            description: 'value = true 使用默认；= false 隐藏；自定义 footer',
                            type: 'boolean | string | JSX.Element',
                            dafaultValue: 'true',
                        },
                        {
                            prop: 'okText',
                            description: '自定义 ok 按钮内容',
                            type: 'string | JSX.Element',
                            dafaultValue: '确认',
                        },
                        {
                            prop: 'cancelText',
                            description: '自定义 cancel 按钮内容',
                            type: 'string | JSX.Element',
                            dafaultValue: '取消',
                        },
                        {
                            prop: 'onOk',
                            description: 'ok 按钮的回调事件',
                            type: '(): void',
                            dafaultValue: '',
                        },
                        {
                            prop: 'onCancel',
                            description: 'cancel 按钮的回调事件',
                            type: '(): void',
                            dafaultValue: '',
                        },
                        {
                            prop: 'beforeMaskClick',
                            description: '点击阴影时前置触发的钩子，当函数返回 true 时会阻止事件执行',
                            type: '(event: React.SyntheticEvent): undefined | boolean',
                            dafaultValue: '',
                        },
                        {
                            prop: 'afterMaskClick',
                            description: '点击阴影时后置触发的钩子',
                            type: '(event: React.SyntheticEvent): void',
                            dafaultValue: '',
                        },
                        {
                            prop: 'beforeDragMove',
                            description: '拖拽移动时前置触发的钩子，当函数返回 true 时会阻止事件执行',
                            type: '(event: React.MouseEvent): undefined | boolean',
                            dafaultValue: '',
                        },
                        {
                            prop: 'afterDragMove',
                            description: '点击阴影时前置触发的钩子',
                            type: '(event: React.MouseEvent): void',
                            dafaultValue: '',
                        },
                        {
                            prop: 'beforeDragScale',
                            description: '拖拽放大缩小时前置触发的钩子，当函数返回 true 时会阻止事件执行',
                            type: '(event: React.MouseEvent): undefined | boolean',
                            dafaultValue: '',
                        },
                        {
                            prop: 'afterDragScale',
                            description: '点击阴影时前置触发的钩子',
                            type: '(event: React.MouseEvent): void',
                            dafaultValue: '',
                        },
                        {
                            prop: 'beforeExtend',
                            description: '全屏或还原时前置触发的钩子，当函数返回 true 时会阻止事件执行',
                            type: '(): undefined | boolean',
                            dafaultValue: '',
                        },
                        {
                            prop: 'afterExtend',
                            description: '全屏或还原时前置触发的钩子',
                            type: '(): void',
                            dafaultValue: '',
                        },
                        {
                            prop: 'afterClose',
                            description: '隐藏对话框时触发的钩子',
                            type: '(): void',
                            dafaultValue: '',
                        },

                    ]}
                />
            </Form.Item>
            <Form.Item>
                <Table
                    pagination={false}
                    title={() => <h3>Extra configurations by open options</h3>}
                    columns={[
                        {
                            title: '参数 param',
                            dataIndex: 'prop',
                            key: 'prop',
                            width: 160
                        },
                        {
                            title: '说明 description',
                            dataIndex: 'description',
                            key: 'description',
                            width: 320
                        },
                        {
                            title: '类型 type',
                            dataIndex: 'type',
                            key: 'type',
                            width: 320
                        },
                        {
                            title: '默认值 dafaultValue',
                            dataIndex: 'dafaultValue',
                            key: 'dafaultValue',
                        },
                    ]}
                    dataSource={[
                        {
                            prop: 'dialogboxRoot',
                            description: '设置 dialogbox 应该在哪渲染',
                            type: 'DOM Element',
                            dafaultValue: 'document.body #dialogboxRoot',
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item>
                <Table
                    pagination={false}
                    title={() => <h3>Dialogbox instance by (open / showDialogbox)</h3>}
                    columns={[
                        {
                            title: '属性名 key',
                            dataIndex: 'prop',
                            key: 'prop',
                            width: 160
                        },
                        {
                            title: '说明 description',
                            dataIndex: 'description',
                            key: 'description',
                            width: 320
                        }
                    ]}
                    dataSource={[
                        {
                            prop: 'DOM',
                            description: 'Dialogbox DOM Element',
                        },
                        {
                            prop: 'dialogboxId',
                            description: '对应的唯一 id，可以用来关闭 dialogbox',
                        },
                        {
                            prop: 'close',
                            description: '用于关闭该 dialogbox 的方法，无需 id',
                        },
                        {
                            prop: 'reactElement',
                            description: '对应的 ReactElement',
                        },
                    ]}
                />
            </Form.Item>
        </Form>
    </div>
}

export default Api