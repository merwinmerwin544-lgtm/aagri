"use client";

import React, { useState } from "react";
import { X, Plus, Calendar, CheckSquare } from "lucide-react";
import { FarmTask } from "@/types";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<FarmTask, "id">) => void;
}

export default function NewTaskModal({ isOpen, onClose, onAddTask }: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [fieldName, setFieldName] = useState("Field 3 - Tomato East Parcel");
  const [scheduledTime, setScheduledTime] = useState("Tomorrow at 09:00 AM");
  const [category, setCategory] = useState<FarmTask["category"]>("Irrigation");
  const [priority, setPriority] = useState<FarmTask["priority"]>("Medium");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      fieldName,
      scheduledTime,
      category,
      priority,
      status: "Pending",
      notes,
    });

    setTitle("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/35 bg-[#03150e]/95 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Schedule Farm Task</h3>
            <p className="text-xs text-slate-400">Add an operational activity to your field log</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Clean drip emitters / Calibrate soil moisture probe"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              >
                <option value="Irrigation">Irrigation</option>
                <option value="Fertilizer">Fertilizer</option>
                <option value="Pest Monitoring">Pest Monitoring</option>
                <option value="Harvest Prep">Harvest Prep</option>
                <option value="Logistics Pickup">Logistics Pickup</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02100b] border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
              >
                <option value="High">High (Immediate)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Field / Parcel Target
            </label>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Scheduled Date & Time
            </label>
            <input
              type="text"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Notes & Soil Parameters
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Operational details for field worker or autonomous sensor..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-500/25 text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-emerald-500/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-black/40 border border-emerald-500/20 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
