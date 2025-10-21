import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import fondoSmall from "../../../assets/fondo-login-small.jpg";
import fondoMedium from "../../../assets/fondo-login-medium.jpg";
import fondoLarge from "../../../assets/fondo-login-large.jpg";

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="auth-bg relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 overflow-hidden">
            {/* Capa de difuminado */}
            {/* <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div> */}

            <div className="relative p-3 rounded z-10 text-center bg-black/40">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-1 flex h-[128px] w-[128px] items-center justify-center rounded-md">
                                    <AppLogoIcon className="fill-current text-[var(--foreground)] dark:text-white" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">{title}</h1>
                                <p className="text-center text-sm text-muted-foreground">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <style>{`
              .auth-bg {
                background-image: url(${fondoSmall});
                background-size: cover;
                background-position: center;
              }
              @media (min-width: 768px) {
                .auth-bg {
                  background-image: url(${fondoMedium});
                }
              }
              @media (min-width: 1920px) {
                .auth-bg {
                  background-image: url(${fondoLarge});
                }
              }
            `}</style>
        </div>
    );
}
