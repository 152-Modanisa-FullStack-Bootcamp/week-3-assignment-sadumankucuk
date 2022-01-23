import {shallowMount} from "@vue/test-utils";
import App from "@/App";

const mountComponent = (count) => {
    return shallowMount(App, {
        mocks: {
            $store: {
                state: {count: count},
                getters: {
                    getCount: count
                }
            }
        }
    });
}

describe("App.vue", () => {

    test("should h1 exists", () => {
        const wrapper = mountComponent(0)
        const h1 = wrapper.find("h1")
        expect(h1.exists).toBeTruthy()
    })

    test("check h1 text equals to Daily Corona Cases in Turkey", () => {
        const wrapper = mountComponent(0)
        const h1Text = wrapper.find("h1").text()
        expect(h1Text).toEqual("Daily Corona Cases in Turkey")
    })

    test("check notificationArea class safe getCount value",  () => {
        const wrapper = mountComponent(0)
        const notificationArea = wrapper.find(".notificationArea");
        expect(notificationArea.classes()).toContain("safe")
    })

    test("check notificationArea class normal getCount value",  () => {
        const wrapper = mountComponent(8)
        const notificationArea = wrapper.find(".notificationArea");
        expect(notificationArea.classes()).toContain("normal")
    })

    test("check notificationArea class danger getCount value",  () => {
        const wrapper = mountComponent(15)
        const notificationArea = wrapper.find(".notificationArea");
        expect(notificationArea.classes()).toContain("danger")
    })

    test("check notificationArea text message", () => {
        const wrapper = mountComponent(15)

        const localThis = {
            $store: {
                state: {count: 15}
            }
        }
        const message = App.computed.message.call(localThis)
        const messageText = wrapper.find(".notificationArea").text();
        expect(message).toStrictEqual(messageText);
    })
})

