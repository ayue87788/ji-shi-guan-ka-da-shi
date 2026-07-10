'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="inline-block mb-4">
          <div className="text-7xl mb-2">🏮</div>
        </div>
        <h1 className="text-4xl font-black text-teal-800 mb-2 font-serif tracking-wide">
          即使闯关大师
        </h1>
        <p className="text-teal-600/70 text-lg font-serif">
          「即使……也……」让步复句特训
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-teal-100">
        <div className="text-left space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">适合对象</h3>
              <p className="text-gray-600 text-sm">
                HSK4级以上中高级汉语学习者
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">学习目标</h3>
              <p className="text-gray-600 text-sm">
                彻底掌握「即使……也……」的核心语义和各种使用场景
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎮</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">闯关模式</h3>
              <p className="text-gray-600 text-sm">
                四大关卡，从语法辨析到文化思辨，层层递进
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 扫码分享卡片 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-teal-100">
        <button
          onClick={() => setShowQR(!showQR)}
          className="w-full flex items-center justify-center gap-2 text-teal-700 font-medium hover:text-teal-800 transition-colors"
        >
          <span className="text-xl">📱</span>
          <span>扫码在手机上学习</span>
          <span className="text-sm text-gray-400">{showQR ? '▲' : '▼'}</span>
        </button>

        {showQR && (
          <div className="mt-5 pt-5 border-t border-teal-100">
            <div className="inline-block p-4 bg-white rounded-xl border-2 border-teal-200 shadow-sm">
              <QRCodeSVG
                value={currentUrl}
                size={180}
                level="H"
                fgColor="#0F766E"
                bgColor="#ffffff"
              />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              打开微信或相机，扫一扫上方二维码
            </p>
            <p className="text-xs text-gray-400 mt-1">
              即可在手机上开始闯关学习
            </p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-6 mb-6 text-white">
        <h3 className="font-bold text-lg mb-3">🏔️ 四大关卡</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/20 rounded-xl p-3">
            <div className="font-bold">第一关</div>
            <div className="opacity-90">语言语境</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <div className="font-bold">第二关</div>
            <div className="opacity-90">言外语境</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <div className="font-bold">第三关</div>
            <div className="opacity-90">情境语境</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <div className="font-bold">第四关</div>
            <div className="opacity-90">情境外语境</div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
        <p className="text-amber-800 text-sm">
          <span className="font-bold">💡 小口诀：</span>
          <br />
          "即使"一出现，"也"字跟后面；
          <br />
          假设条件真，结果却反变；
          <br />
          如若顺理成，就用"如果"填。
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-teal-200"
      >
        准备就绪，开始闯关！
      </button>
    </div>
  );
}
