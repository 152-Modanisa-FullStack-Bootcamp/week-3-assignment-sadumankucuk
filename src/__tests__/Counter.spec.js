import {createLocalVue, shallowMount} from "@vue/test-utils";
import Counter from "@/Counter";
import Vuex from "vuex";
import {actions, state, mutations} from "@/store";

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
    state: {...state},
    actions: {...actions},
    mutations: {...mutations}
})


describe("Counter.vue", () => {
    test("should component exists", () => {
        const wrapper = shallowMount(Counter, {
            localVue,
            store
        })

        expect(wrapper.exists()).toBeTruthy()
    })

    test("should render Increase button", () => {
        const wrapper = shallowMount(Counter, {
            localVue,
            store
        })

        const increaseButton = wrapper.find("#increase-button")
        expect(increaseButton.exists()).toBeTruthy()
        expect(increaseButton.text()).toEqual("Increase")
    })

    test("should render Decrease button", () => {
        const wrapper = shallowMount(Counter, {
            mocks: {
                $store: {
                    state: {}
                }
            }
        })
        const decreaseButton = wrapper.find("#decrease-button")
        expect(decreaseButton.exists()).toBeTruthy()
        expect(decreaseButton.text()).toEqual("Decrease")
    })

    test("check increase trigger", async () => {
        let dispatchMock = jest.fn()
        const wrapper = shallowMount(Counter, {
            mocks: {
                $store: {
                    state: {},
                    dispatch: dispatchMock
                }
            }
        })
        const decreaseButton = wrapper.find("#increase-button")
        await decreaseButton.trigger("click")
        expect(dispatchMock).toBeCalled()
    })

    test("check increase functionality ", async () => {
        let dispatchMock = jest.fn()
        const wrapper = shallowMount(Counter, {
            mocks: {
                $store: {
                    state: {},
                    dispatch: dispatchMock
                }
            }
        })
        const increaseButton = wrapper.find("#increase-button")
        await increaseButton.trigger("click")
        expect(dispatchMock).toHaveBeenCalledWith("increment")
    })

    test("check decrease trigger", async () => {
        let dispatchMock = jest.fn()
        const wrapper = shallowMount(Counter, {
            mocks: {
                $store: {
                    state: {},
                    dispatch: dispatchMock
                }
            }
        })
        const decreaseButton = wrapper.find("#decrease-button")
        await decreaseButton.trigger("click")
        expect(dispatchMock).toBeCalled()
    })

    test("check decrease functionality ", async () => {
        let dispatchMock = jest.fn()
        const wrapper = shallowMount(Counter, {
            mocks: {
                $store: {
                    state: {},
                    dispatch: dispatchMock
                }
            }
        })
        const decreaseButton = wrapper.find("#decrease-button")
        await decreaseButton.trigger("click")
        expect(dispatchMock).toHaveBeenCalledWith("decrement")
    })

    test("2 increase + decrease functionality check together", async () => {

        const wrapper = shallowMount(Counter, {
            localVue,
            store
        })

        const increaseButton = wrapper.find("#increase-button")
        await increaseButton.trigger("click")
        await increaseButton.trigger("click")

        const decreaseButton = wrapper.find("#decrease-button")
        await decreaseButton.trigger("click")
        expect(store.state.count).toStrictEqual(1)

    })

    test("check Count text show", () => {
        const wrapper = shallowMount(Counter, {
            localVue,
            store
        })
        const countText = wrapper.find("span").text()
        expect(countText).toEqual(`${store.state.count}k`)
    })

})
