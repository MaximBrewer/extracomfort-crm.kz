import ChevronLeft from "@/Components/ChevronLeft"
import ChevronRight from "@/Components/ChevronRight"
import { Link } from "@inertiajs/react"

const Item = (props) => {

    const { item } = props

    if (!item.url && (item.label == 'prev' || item.label == 'next')) return ``

    const label = item.label == 'prev' ? <ChevronLeft className={`w-2`} /> : (
        item.label == 'next' ? <ChevronRight className={`w-2`} /> : item.label
    )

    const classes = {
        default: `min-w-[40px] px-3 flex items-center justify-center h-10`,
        active: `min-w-[40px] px-3 flex items-center justify-center h-10 rounded-[6px] bg-violet-500 text-white`
    }

    return <li>
        {item.url && !item.active ? <Link className={classes.default} href={item.url}>{label}</Link> : <span className={item.active ? classes.active : classes.default}>{label}</span>}
    </li>
}


export default (props) => {

    const { current_page, from, last_page, links, path, per_page, to, total } = props

    console.log(props)

    return !from || from === last_page ? `` : <ul className={`flex flex-wrap justify-center my-6 font-bold`}>
        {links.map((item, index) => <Item item={item} key={index} />)}
    </ul>
}