export type CdSkillTree = 'blue' | 'red' | 'green';

export interface CdSkillStep {
  slug: string;
  label: string;
  level: number;
  why: string;
  notes?: string;
}

export interface CdSkillPriority {
  priority: number;
  tree: CdSkillTree;
  treeLabel: string;
  steps: CdSkillStep[];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Shared HTML for remark plugin and CdSkillLadder.astro */
export function renderCdSkillLadderHtml(
  priorities: CdSkillPriority[],
  getIconPath: (slug: string) => string,
): string {
  const groups = priorities
    .map((group) => {
      const steps = group.steps
        .map((step, index) => {
          const src = escapeHtml(getIconPath(step.slug));
          const notes = step.notes
            ? `<p class="cd-skill-ladder__step-notes">${escapeHtml(step.notes)}</p>`
            : '';
          return `<li class="cd-skill-ladder__step">
              <div class="cd-skill-ladder__step-head">
                <span class="cd-skill-ladder__step-num">${index + 1}.</span>
                <span class="cd-skill-ladder__step-name">
                  <img class="cd-skill-ladder__icon" src="${src}" alt="" width="24" height="24" loading="lazy" decoding="async" />
                  ${escapeHtml(step.label)}
                </span>
                <span class="cd-skill-ladder__step-level">→ L${step.level}</span>
              </div>
              <p class="cd-skill-ladder__step-why">${escapeHtml(step.why)}</p>
              ${notes}
            </li>`;
        })
        .join('');

      return `<section class="cd-skill-ladder__group" aria-labelledby="skill-priority-${group.priority}">
          <div class="cd-skill-ladder__header" id="skill-priority-${group.priority}">
            <span class="cd-skill-ladder__priority">Priority ${group.priority}</span>
            <span class="cd-skill-ladder__tree cd-skill-ladder__tree--${group.tree}">${escapeHtml(group.treeLabel)}</span>
          </div>
          <ol class="cd-skill-ladder__steps">${steps}</ol>
        </section>`;
    })
    .join('');

  return `<div class="cd-skill-ladder">${groups}</div>`;
}
