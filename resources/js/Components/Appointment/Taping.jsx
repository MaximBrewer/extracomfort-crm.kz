import PrimaryButton from "../PrimaryButton";

export default (props) => {
    
    const { data, setData, errors, nextTab } = props;

    return <>
        <div className={`bg-blue-80 rounded-lg p-5`}>
            Tap
        </div>
        <PrimaryButton size="sm" onClick={() => nextTab()}>Далее</PrimaryButton>
    </>
}
