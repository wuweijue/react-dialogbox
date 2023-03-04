import * as React from 'react';
import dialogboxMethod from '../components/method/DialogboxMethod';
import { Dialogbox } from './index';

dialogboxMethod.setOption({
    // header: false,
    // footer: false,
    width: 600,
    height: 360
})

class TestComponent extends React.Component {

    state = {
        visible: false
    }

    render() {
        return <>
            <Dialogbox
                title='测试对话框1'
                // dialogboxStyle='macos'
                header={true}
                onCancel={() => {
                    this.setState({ visible: false })
                }}
                fullScreen={false}
                mask={true}
                isModal={true}
                maskClosable={true}
                visible={false}>
                <input />
            </Dialogbox>
            <button onClick={() => {
                // this.setState({ visible: true })
                const { dialogboxId } = dialogboxMethod.open({    
                    onCancel() {
                        dialogboxMethod.hideDialogbox(dialogboxId)
                    },
                    maskClosable: true
                })
            }}>test1</button>
            <button onClick={() => {
                let dialogbox = dialogboxMethod.showDialogbox(<Dialogbox
                    title='测试对话框'
                    maskClosable={true}
                    className='aa333'
                    height={300}
                    width={600}
                    mask={true}
                    onOk={() => {
                        dialogbox.close();
                    }}
                    onCancel={() => {
                        dialogbox.close();
                    }}
                    visible={true}
                >
                    {`
                轻轻的我走了，
                正如我轻轻的来；
                我轻轻的招手，
                作别西天的云彩。

                那河畔的金柳，
                是夕阳中的新娘；
                波光里的艳影，
                在我的心头荡漾。

                软泥上的青荇，
                油油的在水底招摇；
                在康河的柔波里，
                我甘心做一条水草！

                那榆荫下的一潭，
                不是清泉，是天上虹；
                揉碎在浮藻间，
                沉淀着彩虹似的梦。

                寻梦？撑一支长篙，
                向青草更青处漫溯；
                满载一船星辉，
                在星辉斑斓里放歌。

                但我不能放歌，
                悄悄是别离的笙箫；
                夏虫也为我沉默，
                沉默是今晚的康桥！

                悄悄的我走了，
                正如我悄悄的来；
                我挥一挥衣袖，
                不带走一片云彩。
                `}
                </Dialogbox>)
            }

            }>test</button>
        </>
    }
}

export default TestComponent;