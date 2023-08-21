import useCommonStore from "./module/common";
const useStore = () => {
  return {
    useCommonStore: useCommonStore()
  }
}
export default useStore