import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LinkButton(props: any) {
    return (
        <Link href={props.to} className="inline-block bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300">
            {props.text}
        </Link>
    );
}