import { createApp } from "vue";
import "./confirm.css";

const defaultOption = {
  title: "提示",
  type: "",
  message: "",
  showInput: false,
  showCancel: true,
  confirm_text: "确认",
  cancel_text: "取消",
};

function confirmComponent(props) {
  let input = "";
  const is_icon = Boolean(props.type.length);
  const is_message = Boolean(props.message.length);

  return {
    render() {
      return (
        // <div class="fixed inset-0 bg-[rgba(0,0,0,0.4)] animate-[modal-pop_0.2s_ease-out] flex items-center justify-center">
        <div class="confirm-box">
          <div class="confirm-box-header">
            {is_icon && (
              <i class="iconfont icon-gantanhao-xianxingyuankuang warning-icon"></i>
            )}
            <p class="tracking-widest">{props.title}</p>
          </div>

          {is_message && <p class="confirm-box-content">{props.message}</p>}
          {props.showInput && (
            <input
              class="confirm-input"
              value={input}
              onInput={(e) => (input = e.target.value)}
            />
          )}
          <div class="confirm-box-footer">
            {props.showCancel && (
              <div class="cancelbtn" onClick={props.cancel}>
                {props.cancel_text}
              </div>
            )}
            <div class="confirmbtn" onClick={() => props.success(input)}>
              {props.confirm_text}
            </div>
          </div>
        </div>
        // </div>
      );
    },
  };
}

export default function Confirm(options) {
  options = Object.assign({}, defaultOption, options);
  const cancel = options.cancel;
  const success = options.success;

  options.cancel = async () => {
    cancel && cancel();
    app.unmount();
    div.remove();
  };
  options.success = async (e) => {
    success && (await success(e));
    app.unmount();
    div.remove();
  };

  const div = document.createElement("div");
  div.className = "confirm";
  document.body.appendChild(div);

  const app = createApp(confirmComponent(options));

  app.mount(div);
}
