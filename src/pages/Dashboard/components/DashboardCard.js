import { Link } from "react-router-dom"
import { useState } from "react"

export const DashboardCard = ({ order }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="max-w-4xl m-auto p-2 mb-5 border dark:border-slate-700">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex justify-between text-sm m-2 font-bold dark:text-slate-200 hover:opacity-80 transition"
            >
                <span><b>Order Id: </b> {order?.id}</span>
                <span><b> Date : </b> {order?.created_dt}</span>
                <span><b> Item Count: </b>{order?.quantity}</span>
                <span className="flex items-center gap-8">
                    <b>Total:</b> ${order?.total}
                    <i className={`text-lg gap-8 bi ${expanded ? 'bi-dash-circle-fill' : 'bi-plus-circle-fill'}`}></i>
                </span>
            </button>

            {expanded && (
                <div className="border-t dark:border-slate-700">
                    {order.products.map((product) => (
                        <div key={product.id} className="flex flex-wrap justify-between max-w-4xl m-auto p-2 my-5 ">
                            <div className="flex">
                                <Link to={`/products/${product.id}`}>
                                    <img className="w-32 rounded" src={product?.poster} alt={product?.name} />
                                </Link>
                                <div className="flex flex-col items-start">
                                    <Link to={`/products/${product.id}`}>
                                        <p className="text-lg ml-2 dark:text-slate-200">{product?.name} </p>
                                    </Link>
                                    <div className="text-lg m-2 dark:text-slate-200">
                                        <span>${product?.price} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
