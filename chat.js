window.addEventListener('DOMContentLoaded', () => {
    const name = document.getElementById("name")
    const input = document.getElementById("input")
    const sendBtn = document.getElementById("send")
    const msgBox = document.getElementById("chat")

    out = message => {
        const p = document.createElement('p')
        p.textContent = message
        msgBox.prepend(p)
    }

    sendBtn.addEventListener('click', () => {
        ws.send(JSON.stringify(
            {
                "name": name.value,
                "message": input.value
            }
        ))
        
        input.value = ''
    })

    // websocket�R�l�N�V����
    let ws = new WebSocket('ws://18.188.218.88:9001/')

    // �n���h�����`����
    // �ڑ������Ƃ�
    ws.onopen = function () {
        out('Joined')
    }

    // �T�[�o�����M�����Ƃ�
    ws.onmessage = function (e) {
        //JSON�����񂪕Ԃ��Ă���̂ŃI�u�W�F�N�g�ɕϊ�
        let message = JSON.parse(e.data)
        out(message['name'] + ' >>> ' + message['message'])
    }

    // �ʐM������Ƃ�
    ws.onclose = function () {
        out('Leave')
    }

    // �T�[�o����ʐM���r�₦���Ƃ�
    ws.onerror = function () {
        out('Error')
    }
})