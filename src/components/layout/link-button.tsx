import Link from 'next/link';

export default function LinkButton(props: any) {
    return (
        <Link 
            className="bg-gray-900 text-white px-4 py-2 no-underline transition duration-500 hover:text-yellow-400" 
            href={props.to}
        >
            {props.text}
        </Link>
    );
}