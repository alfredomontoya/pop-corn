import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-2xl">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    <span className='text-red-700'>P</span>
                    <span className='text-green-600'>op</span>
                    <span className='text-red-700'>M</span>
                    <span className='text-green-600'>ix</span>
                </span>
            </div>
        </>
    );
}
