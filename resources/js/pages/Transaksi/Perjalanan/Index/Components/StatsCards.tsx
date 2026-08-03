import React from 'react';

interface StatsCardsProps {
    totalCount: number;
    draftCount: number;
    processCount: number;
    doneCount: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
    totalCount,
    draftCount,
    processCount,
    doneCount,
}) => {
    return (
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* Total Usulan */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Total Usulan
                    </span>
                    <h3 className="mt-1 text-2xl font-black text-slate-800">
                        {totalCount}
                    </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            </div>

            {/* Status Draft */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Status Draft
                    </span>
                    <h3 className="mt-1 text-2xl font-black text-amber-600">
                        {draftCount}
                    </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </div>
            </div>

            {/* Sedang Diproses */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Sedang Diproses
                    </span>
                    <h3 className="mt-1 text-2xl font-black text-indigo-600">
                        {processCount}
                    </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </div>

            {/* Selesai / Terbit */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Selesai / Terbit
                    </span>
                    <h3 className="mt-1 text-2xl font-black text-emerald-600">
                        {doneCount}
                    </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};